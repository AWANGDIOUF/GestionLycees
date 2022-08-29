package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Difficulte;
import mefpai.gouv.sn.repository.DifficulteRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.DifficulteService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Difficulte}.
 */
@RestController
@RequestMapping("/api")
public class DifficulteResource {

    private final Logger log = LoggerFactory.getLogger(DifficulteResource.class);

    private static final String ENTITY_NAME = "difficulte";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DifficulteService difficulteService;

    private final DifficulteRepository difficulteRepository;

    public DifficulteResource(DifficulteService difficulteService, DifficulteRepository difficulteRepository) {
        this.difficulteService = difficulteService;
        this.difficulteRepository = difficulteRepository;
    }

    /**
     * {@code POST  /difficultes} : Create a new difficulte.
     *
     * @param difficulte the difficulte to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new difficulte, or with status {@code 400 (Bad Request)} if the difficulte has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/difficultes")
    public ResponseEntity<Difficulte> createDifficulte(@Valid @RequestBody Difficulte difficulte) throws URISyntaxException {
        log.debug("REST request to save Difficulte : {}", difficulte);
        if (difficulte.getId() != null) {
            throw new BadRequestAlertException("A new difficulte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Difficulte result = difficulteService.save(difficulte);
        return ResponseEntity
            .created(new URI("/api/difficultes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /difficultes/:id} : Updates an existing difficulte.
     *
     * @param id the id of the difficulte to save.
     * @param difficulte the difficulte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated difficulte,
     * or with status {@code 400 (Bad Request)} if the difficulte is not valid,
     * or with status {@code 500 (Internal Server Error)} if the difficulte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/difficultes/{id}")
    public ResponseEntity<Difficulte> updateDifficulte(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Difficulte difficulte
    ) throws URISyntaxException {
        log.debug("REST request to update Difficulte : {}, {}", id, difficulte);
        if (difficulte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, difficulte.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!difficulteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Difficulte result = difficulteService.save(difficulte);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, difficulte.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /difficultes/:id} : Partial updates given fields of an existing difficulte, field will ignore if it is null
     *
     * @param id the id of the difficulte to save.
     * @param difficulte the difficulte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated difficulte,
     * or with status {@code 400 (Bad Request)} if the difficulte is not valid,
     * or with status {@code 404 (Not Found)} if the difficulte is not found,
     * or with status {@code 500 (Internal Server Error)} if the difficulte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/difficultes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Difficulte> partialUpdateDifficulte(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Difficulte difficulte
    ) throws URISyntaxException {
        log.debug("REST request to partial update Difficulte partially : {}, {}", id, difficulte);
        if (difficulte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, difficulte.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!difficulteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Difficulte> result = difficulteService.partialUpdate(difficulte);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, difficulte.getId().toString())
        );
    }

    /**
     * {@code GET  /difficultes} : get all the difficultes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of difficultes in body.
     */
    @GetMapping("/difficultes")
    public ResponseEntity<List<Difficulte>> getAllDifficultes(Pageable pageable) {
        log.debug("REST request to get a page of Difficultes");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Difficulte> page = difficulteService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (difficulteService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((difficulteRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /difficultes/:id} : get the "id" difficulte.
     *
     * @param id the id of the difficulte to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the difficulte, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/difficultes/{id}")
    public ResponseEntity<Difficulte> getDifficulte(@PathVariable Long id) {
        log.debug("REST request to get Difficulte : {}", id);
        Optional<Difficulte> difficulte = difficulteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(difficulte);
    }

    /**
     * {@code DELETE  /difficultes/:id} : delete the "id" difficulte.
     *
     * @param id the id of the difficulte to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/difficultes/{id}")
    public ResponseEntity<Void> deleteDifficulte(@PathVariable Long id) {
        log.debug("REST request to delete Difficulte : {}", id);
        difficulteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
