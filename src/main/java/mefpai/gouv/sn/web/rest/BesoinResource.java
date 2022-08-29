package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Besoin;
import mefpai.gouv.sn.repository.BesoinRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.BesoinService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Besoin}.
 */
@RestController
@RequestMapping("/api")
public class BesoinResource {

    private final Logger log = LoggerFactory.getLogger(BesoinResource.class);

    private static final String ENTITY_NAME = "besoin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BesoinService besoinService;

    private final BesoinRepository besoinRepository;

    public BesoinResource(BesoinService besoinService, BesoinRepository besoinRepository) {
        this.besoinService = besoinService;
        this.besoinRepository = besoinRepository;
    }

    /**
     * {@code POST  /besoins} : Create a new besoin.
     *
     * @param besoin the besoin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new besoin, or with status {@code 400 (Bad Request)} if the besoin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/besoins")
    public ResponseEntity<Besoin> createBesoin(@Valid @RequestBody Besoin besoin) throws URISyntaxException {
        log.debug("REST request to save Besoin : {}", besoin);
        if (besoin.getId() != null) {
            throw new BadRequestAlertException("A new besoin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Besoin result = besoinService.save(besoin);
        return ResponseEntity
            .created(new URI("/api/besoins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /besoins/:id} : Updates an existing besoin.
     *
     * @param id the id of the besoin to save.
     * @param besoin the besoin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated besoin,
     * or with status {@code 400 (Bad Request)} if the besoin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the besoin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/besoins/{id}")
    public ResponseEntity<Besoin> updateBesoin(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Besoin besoin
    ) throws URISyntaxException {
        log.debug("REST request to update Besoin : {}, {}", id, besoin);
        if (besoin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, besoin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!besoinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Besoin result = besoinService.save(besoin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, besoin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /besoins/:id} : Partial updates given fields of an existing besoin, field will ignore if it is null
     *
     * @param id the id of the besoin to save.
     * @param besoin the besoin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated besoin,
     * or with status {@code 400 (Bad Request)} if the besoin is not valid,
     * or with status {@code 404 (Not Found)} if the besoin is not found,
     * or with status {@code 500 (Internal Server Error)} if the besoin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/besoins/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Besoin> partialUpdateBesoin(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Besoin besoin
    ) throws URISyntaxException {
        log.debug("REST request to partial update Besoin partially : {}, {}", id, besoin);
        if (besoin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, besoin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!besoinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Besoin> result = besoinService.partialUpdate(besoin);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, besoin.getId().toString())
        );
    }

    /**
     * {@code GET  /besoins} : get all the besoins.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of besoins in body.
     */
    @GetMapping("/besoins")
    public ResponseEntity<List<Besoin>> getAllBesoins(Pageable pageable) {
        log.debug("REST request to get a page of Besoins");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Besoin> page = besoinService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (besoinService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((besoinRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /besoins/:id} : get the "id" besoin.
     *
     * @param id the id of the besoin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the besoin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/besoins/{id}")
    public ResponseEntity<Besoin> getBesoin(@PathVariable Long id) {
        log.debug("REST request to get Besoin : {}", id);
        Optional<Besoin> besoin = besoinService.findOne(id);
        return ResponseUtil.wrapOrNotFound(besoin);
    }

    /**
     * {@code DELETE  /besoins/:id} : delete the "id" besoin.
     *
     * @param id the id of the besoin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/besoins/{id}")
    public ResponseEntity<Void> deleteBesoin(@PathVariable Long id) {
        log.debug("REST request to delete Besoin : {}", id);
        besoinService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
