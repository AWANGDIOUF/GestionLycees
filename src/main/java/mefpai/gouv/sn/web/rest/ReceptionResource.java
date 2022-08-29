package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Reception;
import mefpai.gouv.sn.repository.ReceptionRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.ReceptionService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Reception}.
 */
@RestController
@RequestMapping("/api")
public class ReceptionResource {

    private final Logger log = LoggerFactory.getLogger(ReceptionResource.class);

    private static final String ENTITY_NAME = "reception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReceptionService receptionService;

    private final ReceptionRepository receptionRepository;

    public ReceptionResource(ReceptionService receptionService, ReceptionRepository receptionRepository) {
        this.receptionService = receptionService;
        this.receptionRepository = receptionRepository;
    }

    /**
     * {@code POST  /receptions} : Create a new reception.
     *
     * @param reception the reception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reception, or with status {@code 400 (Bad Request)} if the reception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/receptions")
    public ResponseEntity<Reception> createReception(@Valid @RequestBody Reception reception) throws URISyntaxException {
        log.debug("REST request to save Reception : {}", reception);
        if (reception.getId() != null) {
            throw new BadRequestAlertException("A new reception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reception result = receptionService.save(reception);
        return ResponseEntity
            .created(new URI("/api/receptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /receptions/:id} : Updates an existing reception.
     *
     * @param id the id of the reception to save.
     * @param reception the reception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reception,
     * or with status {@code 400 (Bad Request)} if the reception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/receptions/{id}")
    public ResponseEntity<Reception> updateReception(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Reception reception
    ) throws URISyntaxException {
        log.debug("REST request to update Reception : {}, {}", id, reception);
        if (reception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reception.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!receptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Reception result = receptionService.save(reception);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reception.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /receptions/:id} : Partial updates given fields of an existing reception, field will ignore if it is null
     *
     * @param id the id of the reception to save.
     * @param reception the reception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reception,
     * or with status {@code 400 (Bad Request)} if the reception is not valid,
     * or with status {@code 404 (Not Found)} if the reception is not found,
     * or with status {@code 500 (Internal Server Error)} if the reception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/receptions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Reception> partialUpdateReception(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Reception reception
    ) throws URISyntaxException {
        log.debug("REST request to partial update Reception partially : {}, {}", id, reception);
        if (reception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reception.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!receptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Reception> result = receptionService.partialUpdate(reception);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reception.getId().toString())
        );
    }

    /**
     * {@code GET  /receptions} : get all the receptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of receptions in body.
     */
    @GetMapping("/receptions")
    public ResponseEntity<List<Reception>> getAllReceptions(Pageable pageable) {
        log.debug("REST request to get a page of Receptions");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Reception> page = receptionService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (receptionService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((receptionRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /receptions/:id} : get the "id" reception.
     *
     * @param id the id of the reception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/receptions/{id}")
    public ResponseEntity<Reception> getReception(@PathVariable Long id) {
        log.debug("REST request to get Reception : {}", id);
        Optional<Reception> reception = receptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reception);
    }

    /**
     * {@code DELETE  /receptions/:id} : delete the "id" reception.
     *
     * @param id the id of the reception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/receptions/{id}")
    public ResponseEntity<Void> deleteReception(@PathVariable Long id) {
        log.debug("REST request to delete Reception : {}", id);
        receptionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
